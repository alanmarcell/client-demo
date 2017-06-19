import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private fb: FormBuilder) {
    this.myForm = fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.newUser = true;
    this.user = new User();
    this.user.admin = false;
  }

  save() {
    this.userService
      .save(this.user)
      .then(user => {
        if (user) {
          this.user = user; // saved user, w/ id if new
        }
      })
      .catch(error => this.error = error); // TODO: Display error message
  }
}
