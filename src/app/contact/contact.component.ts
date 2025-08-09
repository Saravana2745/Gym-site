import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule]
})
export class ContactComponent {
  constructor(private http: HttpClient) {}
ngOnInit() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.http.post('http://localhost:3000/api/contact', form.value)
        .subscribe({
          next: () => alert('Thank you for contacting us!'),
          error: () => alert('There was an error. Please try again.')
        });
      form.resetForm();
    }
  }
}