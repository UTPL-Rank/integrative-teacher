import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-important-documents',
  templateUrl: './important-documents.component.html',
  styleUrls: ['./important-documents.component.scss']
})
export class ImportantDocumentsComponent implements OnInit {

  // Documentos antiguos
  /* url = 'https://docs.google.com/spreadsheets/d/1EGMGZhRADzqaxPS0RG6Qc71MZaTgC_Jx/preview?ouid=115298535190732802212'; */
  /* url3 = 'https://docs.google.com/file/d/1P1J0CkAxTnmYzF2X1TAeBEafK50UYLyJ/preview'; */

  // hoja de ruta
  url = 'https://docs.google.com/spreadsheets/d/1Ch8L6plytjpFljPKzc_9rv67OVwNmTkA/preview'

  // formato de planificación
  url2 = 'https://docs.google.com/file/d/1-9MJGZVleOtYQq7pVJ-90hLpmiX1lkZM/preview';

  // proyecto docente integrador
  url3 = 'https://docs.google.com/file/d/10clF0Tc0aC-y56W57UurF79oZhQ4Z7I6/preview';

  constructor() { }

  ngOnInit(): void {

  }

}
