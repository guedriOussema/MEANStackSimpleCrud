import { TestBed, async } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { from, empty, throwError, Observable } from 'rxjs';


describe('EditComponent', () => {

  let edit;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditComponent
      ],
      imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          ReactiveFormsModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(EditComponent);
    edit = fixture.debugElement.componentInstance;
  });


  it('should create the edit component', async(() => {
    expect(edit).toBeTruthy();
  }));
 

  it('should create a form with two controls', () => {
    
    expect(edit.angForm.contains('unit_name')).toBeTruthy();
    expect(edit.angForm.contains('unit_price')).toBeTruthy();
  });

  it('should make the two controls required', () => {
    
    let controlName = edit.angForm.get('unit_name');
    let controlPrice = edit.angForm.get('unit_price');

    controlName.setValue('');
    controlPrice.setValue('');
    
    expect(controlName.valid).toBeFalsy();
    expect(controlPrice.valid).toBeFalsy();
  });

  it('should call the server to update the adUnit', () => {
    let spy = spyOn(edit.adunitservice,'updateAdUnit').and.callFake(t => {
      return empty();
    });

    edit.updateAdUnit(undefined, undefined);

    expect(spy).toHaveBeenCalled();
  });

});
