import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AdunitService } from "./adunit.service";
import { AdUnit } from "./components/index/AdUnit";
 

 
describe("AdunitService", () => {
  let httpTestingController: HttpTestingController;
  let adunitService: AdunitService;
  let baseUrl = "http://localhost:4000/adunits";
  let adunit: AdUnit;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
 
    httpTestingController = TestBed.get(HttpTestingController);
    adunit = {
      id: 2,
      unit_name: "John",
      unit_price: 18
    };
  });
 
  beforeEach(inject(
    [AdunitService],
    (service: AdunitService) => {
      adunitService = service;
    }
  ));


it("should return data", () => {
    let result: AdUnit[];
    adunitService.getAdUnits().subscribe((t:any) => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl
    });
   
    req.flush([adunit]);
   
    expect(result[0]).toEqual(adunit);
  });



  it("should throw error when the data failed to be received", () => {
    let error: string;
    adunitService.getAdUnits().subscribe(null, e => {
      error = e;
    });
   
    let req = httpTestingController.expectOne("http://localhost:4000/adunits");
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });
   
    expect(error).toBeTruthy();
  });



  it("should call POST API to create a new adUnit", () => {
    adunitService.addAdUnit(adunit.unit_name, adunit.unit_price).subscribe();
   
    let req = httpTestingController.expectOne({ method: "POST", url: baseUrl+'/add' });

    adunit.id = req.request.body.id;

    expect(req.request.body.id).toEqual(adunit.id);
    expect(req.request.body.unit_name).toEqual(adunit.unit_name);
    expect(req.request.body.unit_price).toEqual(adunit.unit_price);
  });


  it("should call post API to update an adunit", () => {
    adunitService.updateAdUnit(adunit.unit_name, adunit.unit_price, adunit.id);
   
    let req = httpTestingController.expectOne({
      method: "POST",
      url: `${baseUrl}/update/${adunit.id}`
    });

    expect(req.request.body.unit_name).toEqual(adunit.unit_name);
    expect(req.request.body.unit_price).toEqual(adunit.unit_price);
  });


  it("should call delete API to delete an adunit", async() => {


    await adunitService.addAdUnit(adunit.unit_name, adunit.unit_price).subscribe((data:any) =>{
        let id = data.id;

        let reqPost = httpTestingController.expectOne({ method: "POST", url: baseUrl+'/add' });


        adunitService.deleteAdUnit(reqPost.request.body.id).subscribe();
   
        let req = httpTestingController.expectOne({
            method: "DELETE",
            url: `${baseUrl}/delete/${id}`
        });

        expect(req.request.body.unit_name).toEqual(adunit.unit_name);
        expect(req.request.body.unit_price).toEqual(adunit.unit_price);

    });
    
  });





});