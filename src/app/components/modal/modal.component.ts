import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() message: String = "";
  @Output() modalClose = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  onCloseClicked() {
    this.modalClose.emit(true);
  }
}
