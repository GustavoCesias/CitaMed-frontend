import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    nombre : '',
    apellido : '',
    email : '',
    telefono : ''
  }
  console: any;

  constructor(private renderer: Renderer2, private userService:UserService,private snack:MatSnackBar) { }

  ngOnInit() {
    // Obtener elementos del DOM con anotaciones de tipos
    const container: HTMLElement | null = document.getElementById('container');
    const registerBtn: HTMLElement | null = document.getElementById('register');
    const loginBtn: HTMLElement | null = document.getElementById('login');

    // Verificar si los elementos fueron encontrados antes de continuar
    if (container && registerBtn && loginBtn) {
      // Agregar evento al botón de registro
      this.renderer.listen(registerBtn, 'click', () => {
        if (container.classList) {
          container.classList.add('active');
        }
      });

      // Agregar evento al botón de inicio de sesión
      this.renderer.listen(loginBtn, 'click', () => {
        if (container.classList) {
          container.classList.remove('active');
        }
      });
    }
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.registrarUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        alert('Usuario guardado');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )
  }
}
