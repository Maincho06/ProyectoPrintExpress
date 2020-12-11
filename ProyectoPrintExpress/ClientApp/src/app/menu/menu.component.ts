import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy {
  
  mobileQuery: MediaQueryList;

  fillerNav = [
    { name: 'Administrar Almacen', route: 'aAlmacen', icon: 'widgets' },
    { name: 'Administrar Pedido', route: 'aPedido', icon: 'store' },
    { name: 'Registrar Pedido', route: 'rPedido', icon: 'group' },
  ];

  private _mobileQueryListener: () => void;
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

}
