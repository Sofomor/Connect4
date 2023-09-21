import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appCountdown]'
})

// Initialisation du compte à rebours depuis la fin + Mise à jour HTML

export class CountdownDirective implements OnInit {

  @Input() endDate: Date = new Date();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initializeCountdown();
  }

  initializeCountdown() {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.endDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.el.nativeElement.innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

      if (distance < 0) {
        clearInterval(interval); // Arrêt de l'intervalle
      }
    }, 1000);
  }
}
