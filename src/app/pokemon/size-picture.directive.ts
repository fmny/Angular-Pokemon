import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[pkmnPictureSizeHeight],[pkmnPictureSizeWidth]'
})
export class SizePictureDirective {

  constructor(private el: ElementRef) {
    this.setHeight(150);
    this.setWidth(150);
  }

  @Input('pkmnPictureSizeHeight') set height(height: string) {
    this.setHeight(+height || 100);
  };

  @Input('pkmnPictureSizeWidth') set width(width: string) {
    this.setWidth(+width || 100);
  };

  setHeight(height:number) {
  this.el.nativeElement.style.height = `${height}px`;
  };

  setWidth(width:number) {
  this.el.nativeElement.style.width = `${width}px`;
  };


}


