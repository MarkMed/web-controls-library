import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  Watch
} from "@stencil/core";
import { SwitchRender } from "../renders/bootstrap/switch/switch-render";
import { IFormComponent } from "../common/interfaces";
@Component({
  shadow: false,
  styleUrl: "switch.scss",
  tag: "gx-switch"
})
export class Switch implements IFormComponent {
  handleChange: (UIEvent: any) => void;

  constructor() {
    this.renderer = new SwitchRender(this);
  }

  private renderer: SwitchRender;

  @Element() element;

  /**
   * Attribute that provides the caption to the control.
   */
  @Prop() caption: string;
  /**
   * Indicates if switch control is checked by default.
   */
  @Prop({ mutable: true })
  checked: boolean;

  @Prop({ mutable: true })
  value: string;
  /**
   * This attribute allows you specify if the element is disabled.
   * If disabled, it will not trigger any user interaction related event
   * (for example, click event).
   */
  @Prop() disabled = false;

  /**
   * The control id. Must be unique per control!
   */
  @Prop() id: string;

  /**
   * This attribute lets you specify how this element will behave when hidden.
   *
   * | Value        | Details                                                                     |
   * | ------------ | --------------------------------------------------------------------------- |
   * | `keep-space` | The element remains in the document flow, and it does occupy space.         |
   * | `collapse`   | The element is removed form the document flow, and it doesn't occupy space. |
   */
  @Prop() invisibleMode: "collapse" | "keep-space" = "collapse";

  /**
   * The 'input' event is emitted when a change to the element's value is committed by the user.
   */
  @Event() input: EventEmitter;

  /**
   * Returns the id of the inner `input` element (if set).
   */
  @Method()
  async getNativeInputId() {
    return this.renderer.getNativeInputId();
  }

  @Watch("checked")
  protected checkedChanged() {
    this.renderer.checkedChanged();
  }

  hostData() {
    return {
      role: "switch"
    };
  }

  render() {
    return this.renderer.render();
  }
}
