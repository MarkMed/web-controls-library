import { Component, Element, Event, EventEmitter, Prop } from "@stencil/core";

import { IComponent } from "../common/interfaces";

@Component({
  shadow: false,
  styleUrl: "gauge-range.scss",
  tag: "gx-gauge-range"
})
export class GaugeRange implements IComponent {
  @Element() element: HTMLElement;

  /**
   * The amount of range length.
   *
   */
  @Prop() amount: number;

  /**
   * The name of the range.
   *
   */
  @Prop() name: string;

  /**
   * Color property defines the color of range background.
   * Color value can be in any color model *(hex, rgb, rgba, hsl, cmyk)*.
   *
   */
  @Prop() color: string;

  ////////////////////////////////////////

  @Event() gxGaugeRangeDidLoad: EventEmitter;

  @Event() gxGaugeRangeDidUnload: EventEmitter;

  componentDidLoad() {
    this.gxGaugeRangeDidLoad.emit(this);
    // tslint:disable-next-line:no-console
    console.log("Loaded");
  }
  /* To fix 0.
    */ componentDidUnload() {
    this.gxGaugeRangeDidUnload.emit(this);
    // tslint:disable-next-line:no-console
    console.log("Unloaded");
  }

  render() {
    return "";
  }
}