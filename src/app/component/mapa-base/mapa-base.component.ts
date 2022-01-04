import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import Map from 'ol/Map';

@Component({
  selector: 'app-map',
  template: '',
  styles: [':host { width: 800px; height: 800px; display: block; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapaBaseComponent implements OnInit {

  @Input() map: Map;
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit() {
    this.map.setTarget(this.elementRef.nativeElement);
  }

}
