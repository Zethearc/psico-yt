import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;
  errorMessage: string | null = null;
  isUserAlreadyRegistered: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log(error);
        this.errorMessage = error.message;
        if (error.message === "The email address is already in use.") {
          this.isUserAlreadyRegistered = true;
        }
      });
  }
  
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
