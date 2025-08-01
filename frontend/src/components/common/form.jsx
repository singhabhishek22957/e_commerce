import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React from "react";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const renderInputComponentType = (control) => {
    let element = null;
    const value = formData[control.name] || "";
    switch (control.componentType) {
      case "input":
        element = (
          <Input
            onChange={(event) =>
              setFormData({
                ...formData,
                [control.name]: event.target.value,
              })
            }
            value={value}
            name={control.name}
            placeholder={control.placeholder}
            type={control.type}
            id={control.name}
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(event) =>
              setFormData({
                ...formData,
                [control.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options && control.options.length > 0
                ? control.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "checkbox":
        element = <Checkbox value={value} {...control} />;
        break;
      case "textarea":
        element = <Textarea value={value} {...control} />;
        break;
      default:
        element = (
          <Input
            onchange={(event) =>
              setFormData({
                ...formData,
                [control.name]: event.target.value,
              })
            }
            value={value}
            name={control.name}
            placeholder={control.placeholder}
            type={control.type}
            id={control.name}
          />
        );
        break;
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className=" flex flex-col gap-3">
        {formControls.map((control) => (
          <div className=" grid w-full gap-1.5" key={control.name}>
            <Label className=" mb-1">{control.label}</Label>
            {renderInputComponentType(control)}
          </div>
        ))}
      </div>
      <Button className=" w-full mt-3" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
