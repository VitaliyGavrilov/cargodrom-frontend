import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appPhoneMask]'
})
export class PhoneMaskDirective {
  private input: HTMLInputElement;

  constructor(private el: ElementRef) {
    this.input = el.nativeElement as HTMLInputElement;
  }
  
  private getInputNumbersValue() {
    // Return stripped input value — just numbers
    return this.input.value.replace(/\D/g, '');
  }

  @HostListener('paste', ['$event'])
  onPhonePaste(e: ClipboardEvent) {
    const input = this.input;
    const inputNumbersValue = this.getInputNumbersValue();
    const pasted = e.clipboardData || (window as any).clipboardData;
    if (pasted) {
      const pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  @HostListener('input', ['$event'])
  onPhoneInput(e: Event): void {
    const input = this.input;
    let inputNumbersValue = this.getInputNumbersValue();
    const selectionStart = input.selectionStart;
    let formattedInputValue = "";

    if (!inputNumbersValue) {
      input.value = "";
      return;
    }

    if (input.value.length != selectionStart) {
      // Editing in the middle of input, not last symbol
      if ((e as any).data && /\D/g.test((e as any).data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") {
        inputNumbersValue = "7" + inputNumbersValue;
      }
      const firstSymbols = (inputNumbersValue[0] == "8") ? "+7" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }

  @HostListener('blur', ['$event'])
  onPhoneBlur(e: Event) {
    const input = this.input;
    const inputNumbersValue = this.getInputNumbersValue();

    if (["7"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue.length < 11) {
        input.value = '';
      }
    } else {
      if (inputNumbersValue.length < 16) {
        input.value = '';
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onPhoneKeyDown(e: KeyboardEvent) {
    const input = this.input;
    // Clear input after remove last symbol
    var inputValue = input.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
      input.value = "";
    }
  }
}
