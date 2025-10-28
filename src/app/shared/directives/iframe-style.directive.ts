// iframe-style.directive.ts
import { Directive, Input, ElementRef, OnChanges, OnDestroy } from '@angular/core';

@Directive({
  selector: 'iframe[appIframeStyle]'
})
export class IframeStyleDirective implements OnChanges, OnDestroy {
  @Input('appIframeStyle') styleString: string = '';
  private isIframeLoaded = false;
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private lastHeight: number = 0;

  constructor(private element: ElementRef<HTMLIFrameElement>) {
    this.element.nativeElement.addEventListener('load', () => {
      console.log('iframe loaded');
      this.isIframeLoaded = true;
      this.inject();
      this.setupHeightObserver();
    });
  }

  ngOnChanges(changes: any): void {
    console.log('ngOnChanges called', this.styleString);
    
    if (changes.styleString) {
      this.styleString = changes.styleString.currentValue;
    }
    
    if (this.isIframeLoaded && this.styleString) {
      console.log('injecting styles');
      this.inject();
    }
  }

  private inject() {
    const iframe = this.element.nativeElement;
    const doc = iframe.contentDocument;
    if (!doc) return;

    // 1. Добавляем CSS переменные в :root
    let style = doc.getElementById('dynamic-iframe-styles');
    if (!style) {
      style = doc.createElement('style');
      style.id = 'dynamic-iframe-styles';
      doc.head.appendChild(style);
    }
    
    // 2. Переопределяем стили у div с классом "content"
    style.textContent = `
      :root { ${this.styleString} }
      
      div.content {
        ${this.styleString} !important;
      }
      
      .content {
        ${this.styleString} !important;
      }
    `;

    // 3. Принудительно применяем стили к элементу и добавляем класс
    const contentDiv = doc.querySelector('div.content');
    if (contentDiv) {
      const divElement = contentDiv as HTMLElement;
      
      // Парсим строку стилей и применяем каждое свойство
      this.styleString.split(';').forEach(style => {
        const [property, value] = style.split(':');
        if (property && value) {
          divElement.style.setProperty(property.trim(), value.trim());
        }
      });
      
      // Добавляем класс к элементу
      divElement.classList.add('demo-page'); // замените 'your-class-name' на нужный класс
    }

    console.log('styles injected and applied to .content div, class added');
  }

  private setupHeightObserver() {
    const iframe = this.element.nativeElement;
    const doc = iframe.contentDocument;
    if (!doc) return;

    const userModuleDiv = doc.querySelector('div.user-module') as HTMLElement;
    if (!userModuleDiv) {
      console.warn('div.user-module not found in iframe');
      return;
    }

    // Функция обновления высоты iframe
    const updateIframeHeight = () => {
      const userModuleHeight = userModuleDiv.scrollHeight;
      const newHeight = userModuleHeight + 1; // +1px как ты просил
      
      // Обновляем только если высота изменилась
      if (this.lastHeight !== newHeight) {
        this.lastHeight = newHeight;
        iframe.style.height = newHeight + 'px';
        console.log('Iframe height updated:', newHeight);
      }
    };

    // 1. ResizeObserver для отслеживания изменений размера
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => {
        updateIframeHeight();
      });
      this.resizeObserver.observe(userModuleDiv);
    }

    // 2. MutationObserver для отслеживания изменений DOM
    this.mutationObserver = new MutationObserver(() => {
      updateIframeHeight();
    });

    this.mutationObserver.observe(userModuleDiv, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    // Также отслеживаем изменения во всем документе
    this.mutationObserver.observe(doc.body, {
      childList: true,
      subtree: true
    });

    // Первоначальная установка высоты
    setTimeout(() => updateIframeHeight(), 100);

    // Также обновляем при изменении окна
    iframe.contentWindow?.addEventListener('resize', updateIframeHeight);
  }

  ngOnDestroy() {
    // Очищаем observers при уничтожении директивы
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }
}