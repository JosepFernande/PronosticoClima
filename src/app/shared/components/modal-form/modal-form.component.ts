import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'modal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent implements OnInit {
  formLocation!: FormGroup

  private formBuilder = inject(FormBuilder)
  private locationServ = inject(LocationService)

  @Output()
  public close: EventEmitter<boolean> = new EventEmitter<boolean>()

  ngOnInit(): void {
    this.formLocation = this.formBuilder.group({
      id: [this.locationServ.locations.length + 1],
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      days: [null]
    })
  }

  getProperties(name: string,): AbstractControl<any, any> {
    return this.formLocation.get(name)!;
  }

  onSubmit() {
    Object.keys(this.formLocation.controls).forEach((key) => {
      this.formLocation.get(key)?.markAsTouched()
    })

    if (this.formLocation.valid) {
      this.locationServ.newClimaticLocation(this.formLocation.value)
      this.closeModal()
    }
  }

  closeModal() {
    this.close.next(true)
  }
}


