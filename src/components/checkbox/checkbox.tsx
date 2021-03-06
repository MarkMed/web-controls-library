import { CheckBoxRender } from "../renders/bootstrap/checkbox/checkbox-render";
import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  Watch
} from "@stencil/core";
import { IFormComponent } from "../common/interfaces";

@Component({
  shadow: false,
  styleUrl: "checkbox.scss",
  tag: "gx-checkbox"
})
export class CheckBox implements IFormComponent {
  constructor() {
    this.renderer = new CheckBoxRender(this);
  }

  private renderer: CheckBoxRender;

  @Element() element: HTMLElement;

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
   * This attribute lets you specify if the element is disabled.
   * If disabled, it will not fire any user interaction related event
   * (for example, click event).
   */
  @Prop() disabled = false;

  /**
   * Specifies the label of the checkbox.
   */
  @Prop() caption: string;

  /**
   * Indicates that the control is selected by default.
   */
  @Prop({ mutable: true })
  checked: boolean;

  /**
   * The value of the control.
   */
  @Prop({ mutable: true })
  value: string;

  /**
   * The value when the checkbox is 'on'
   */
  @Prop() checkedValue: string;

  /**
   * The value when the checkbox is 'off'
   */
  @Prop() unCheckedValue: string;

  /**
   * A CSS class to set as the inner `input` element class.
   */
  @Prop() cssClass: string;

  /**
   * The identifier of the control. Must be unique.
   */
  @Prop() id: string;

  /**
   * The `input` event is emitted when a change to the element's value is committed by the user.
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

  componentWillLoad() {
    this.checked = this.value === this.checkedValue;
  }

  @Watch("value")
  protected valueChanged() {
    this.checked = this.value === this.checkedValue;
  }

  handleChange(event: UIEvent) {
    this.checked = this.renderer.getValueFromEvent(event);
    this.updateValue();
    this.input.emit(event);
  }

  updateValue() {
    this.value = this.checked ? this.checkedValue : this.unCheckedValue;
  }

  render() {
    return this.renderer.render();
  }
}
