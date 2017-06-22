import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @Input() user: User;
  newUser = false;
  error: any;
  myForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authenticationService: AuthService) {
    this.myForm = fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      displayName: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.newUser = true;
    this.user = new User();
    this.user.admin = false;
  }

  authenticate() {
    this.user.userNameOrEmail = this.user.email || this.user.userName;

    this.authenticationService
      .authenticateUser(this.user)
      .catch(error => this.error = error);
  }

  savePtz() {
    this.userService
      .save(this.user)
      .then(user => {
        if (user) {
          this.user = user; // saved user, w/ id if new
        }
        this.authenticate();
      })
      .catch(error => this.error = error); // TODO: Display error message
  }
}
