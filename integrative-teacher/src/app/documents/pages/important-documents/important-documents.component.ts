import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-important-documents',
  templateUrl: './important-documents.component.html',
  styleUrls: ['./important-documents.component.scss']
})
export class ImportantDocumentsComponent implements OnInit {

  url = 'https://docs.google.com/spreadsheets/d/1RLBSB1fKzAKY_FecXdDwOObywq-XnFBj/preview?ouid=115298535190732802212';
  url2 = 'https://docs.google.com/file/d/1-9MJGZVleOtYQq7pVJ-90hLpmiX1lkZM/preview';
  url3 = 'https://docs.google.com/file/d/1P1J0CkAxTnmYzF2X1TAeBEafK50UYLyJ/preview';

  constructor() { }

  ngOnInit(): void {

  }

}
