import { CountdownDirective } from './countdown.directive';
import { ElementRef } from '@angular/core';

describe('CountdownDirective', () => {
  it('should create an instance', () => {
    const elRef = new ElementRef(document.createElement('div'));
    const directive = new CountdownDirective(elRef);
    expect(directive).toBeTruthy();
  });
});
