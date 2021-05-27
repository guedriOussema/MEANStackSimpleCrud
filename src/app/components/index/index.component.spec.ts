import { TestBed, async, inject } from '@angular/core/testing';
import { IndexComponent } from './index.component';
import { RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { from, empty, throwError, Observable } from 'rxjs';
import { of } from 'rxjs';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import { AdunitService } from 'src/app/adunit.service';
import { AdUnit } from './AdUnit';


describe('IndexComponent', () => {

  let adunitService;
  let indexComponent;
  let fixture;
  let element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IndexComponent
      ],
      providers: [
        AdunitService
      ],
      imports: [
          RouterTestingModule,
          HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(inject([AdunitService], s => {
    adunitService = s;
    fixture = TestBed.createComponent(IndexComponent);
    indexComponent = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  it('should create the index component', async(() => {
    const fixture = TestBed.createComponent(IndexComponent);
    const index = fixture.debugElement.componentInstance;
    expect(index).toBeTruthy();
  }));


  it("should call getUnits and return list of adUnits", async(() => {
    const response: AdUnit[] = [];
    spyOn(adunitService, 'getAdUnits').and.returnValue(of(response));
    indexComponent.getAdUnits();
    fixture.detectChanges();
    expect(indexComponent.adunits).toEqual(response);
  }));

  
  it('should call the server to delete the adUnit', () => {
    let spy = spyOn(indexComponent.adunitservice,'deleteAdUnit').and.callFake(t => {
      return empty();
    });

    indexComponent.deleteAdUnit(undefined);

    expect(spy).toHaveBeenCalled();
  });

  
 
});
