
import { FormBuilder } from '@angular/forms';
import { from, empty, throwError, Observable } from 'rxjs';
import { AdunitService } from 'src/app/adunit.service';
import { IndexComponent } from '../index/index.component';

import { CreateComponent } from './create.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdUnit } from '../index/AdUnit';


describe('CreateComponent', () => {


  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateComponent
      ],
      imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          ReactiveFormsModule
      ],
    }).compileComponents();
  }));


  beforeEach(() => {
    const fixture = TestBed.createComponent(CreateComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a form with two controls', () => {
    
    expect(component.angForm.contains('unit_name')).toBeTruthy();
    expect(component.angForm.contains('unit_price')).toBeTruthy();
  });

  it('should make the two controls required', () => {
    
    let controlName = component.angForm.get('unit_name');
    let controlPrice = component.angForm.get('unit_price');

    controlName.setValue('');
    controlPrice.setValue('');
    
    expect(controlName.valid).toBeFalsy();
    expect(controlPrice.valid).toBeFalsy();
  });


  it('should call the server to save the changes when a new AdUnit is added', () => {
    let spy = spyOn(component.adunitservice,'addAdUnit').and.callFake(t => {
      return empty();
    });

    component.addAdUnit(undefined, undefined);

    expect(spy).toHaveBeenCalled();
  });

 
  it('should add the new adUnit returned from the server', () => {

    let adUnit = { unit_name: "unit name test", unit_price:251 };
    let spy = spyOn(component.adunitservice,'addAdUnit').and.returnValue(from([ adUnit ]));

    component.addAdUnit(adUnit.unit_name, adUnit.unit_price);

    let adunits : AdUnit[] = [];

    component.adunitservice.getAdUnits()
    .subscribe((data: AdUnit[]) => {
      adunits = data;
  });

    expect(adunits.indexOf(adUnit)).toBeGreaterThan(-1);
  });

});
