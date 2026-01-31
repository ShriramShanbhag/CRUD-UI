import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/users.service';
import { Observable } from 'rxjs';
import { User } from '../../core/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatProgressSpinnerModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
})
export class UsersPage {
  users$!: Observable<User[]>;

  constructor(private usersService: UsersService) {
    this.users$ = this.usersService.getAll();
  }
}
