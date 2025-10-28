import { Component, Input, Output, EventEmitter, HostListener, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

export type PanelPlacement = 'top' | 'bottom';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements AfterViewInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() preferredPlacement: PanelPlacement = 'bottom';
  @Input() closeOnBackdropClick: boolean = true;
  
  @Output() closed = new EventEmitter<void>();

  placement: PanelPlacement = 'bottom';
  private resizeObserver: ResizeObserver | null = null;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.isOpen) {
          this.updatePanelPosition();
        }
      });
      
      const container = this.elementRef.nativeElement.querySelector('.panel-container');
      if (container) {
        this.resizeObserver.observe(container);
      }
    }
  }

  private updatePanelPosition(): void {
    const container = this.elementRef.nativeElement.querySelector('.panel-container');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const panelHeight = 320; // Примерная высота панели
    
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (this.preferredPlacement === 'bottom' && spaceBelow >= panelHeight) {
      this.placement = 'bottom';
    } else if (this.preferredPlacement === 'top' && spaceAbove >= panelHeight) {
      this.placement = 'top';
    } else if (spaceBelow >= panelHeight) {
      this.placement = 'bottom';
    } else if (spaceAbove >= panelHeight) {
      this.placement = 'top';
    } else {
      this.placement = spaceBelow >= spaceAbove ? 'bottom' : 'top';
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen || !this.closeOnBackdropClick) return;
    
    const target = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(target);
    
    if (!clickedInside) {
      this.closePanel();
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onWindowChange(): void {
    if (this.isOpen) {
      this.updatePanelPosition();
    }
  }

  closePanel(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick) {
      this.closePanel();
    }
  }

  onContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}