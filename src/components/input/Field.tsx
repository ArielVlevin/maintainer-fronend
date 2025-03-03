import { useFormContext } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

import {
  DateRangePicker,
  Dialog,
  Group,
  Label as AriaLabel,
  Popover as AriaPopover,
  Button as AriaButton,
} from "react-aria-components";
import { RangeCalendar } from "../ui/calendar-rac";
import { DateInput, dateInputStyle } from "../ui/datefield-rac";
import { Label } from "../ui/label";
import { InputWrapper } from "./InputWrapper";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { type Tag, TagInput } from "emblor";
import { useId, useState } from "react";

interface ReusableFormFieldProps {
  name: string;
  label: string;
  description?: string;
  isMaxLength?: boolean;
  maxLength?: number;
  required?: boolean;
  type?:
    | "text"
    | "number"
    | "select"
    | "switch"
    | "tag"
    | "date"
    | "date-range";
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export function Field({
  name,
  label,
  description,
  isMaxLength,
  maxLength = 20,
  required,
  type = "text",
  placeholder,
  options,
}: ReusableFormFieldProps) {
  const { control, setValue } = useFormContext();
  const id = useId();

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {type === "switch" && (
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-semibold">
                  {label}
                </FormLabel>
                <FormDescription>{description}</FormDescription>
              </div>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </div>
          )}

          {type !== "switch" && (
            <InputWrapper required={required} label={label} name={name}>
              {/* Text / Number Input */}
              {(type === "text" || type === "number") && (
                <div className="relative">
                  <Input
                    {...field}
                    type={type}
                    placeholder={placeholder || `Enter ${label}`}
                    value={value}
                    onChange={(arg) => {
                      handleChange(arg);
                      field.onChange(arg);
                    }}
                  />
                  {isMaxLength && maxLength && (
                    <div
                      id={`${name}-description`}
                      className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs tabular-nums peer-disabled:opacity-50"
                      aria-live="polite"
                      role="status"
                    >
                      {characterCount}/{limit}
                    </div>
                  )}
                </div>
              )}

              {/* Select Input */}
              {type === "select" && options && (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {/* Tag Input */}
              {type === "tag" && (
                <TagInput
                  id={id}
                  tags={
                    Array.isArray(field.value)
                      ? field.value.map((text: string, index: number) => ({
                          id: index.toString(),
                          text,
                        }))
                      : []
                  }
                  setTags={(newTags) => {
                    // ✅ בדיקה אם `newTags` הוא מערך
                    if (Array.isArray(newTags)) {
                      const updatedTags = newTags.map((tag) => tag.text);
                      setValue(name, updatedTags);
                    }
                  }}
                  placeholder="Add a tag"
                  activeTagIndex={activeTagIndex} // ✅ הוספנו את האינדקס של התגית הפעילה
                  setActiveTagIndex={setActiveTagIndex} // ✅ עדכון האינדקס של התגית הפעילה
                  styleClasses={{
                    tagList: {
                      container: "gap-1",
                    },
                    input:
                      "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    tag: {
                      body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                      closeButton:
                        "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
                    },
                  }}
                  inlineTags={false}
                  inputFieldPosition="top"
                />
              )}

              {/* Date Picker */}
              {type === "date" && (
                <div className="group relative">
                  <Label
                    htmlFor={name}
                    className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50"
                  >
                    {label}
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format(field.value, "dd/MM/yyyy")
                          : "Select date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {/* Date Range Picker */}
              {type === "date-range" && (
                <DateRangePicker
                  className="*:not-first:mt-2"
                  value={{
                    start: field.value?.startDate ?? new Date(),
                    end: field.value?.endDate ?? new Date(),
                  }}
                  onChange={(range) =>
                    field.onChange({
                      startDate: range?.start ?? new Date(),
                      endDate: range?.end ?? new Date(),
                    })
                  }
                >
                  <AriaLabel className="text-foreground text-sm font-medium">
                    {label}
                  </AriaLabel>
                  {description && (
                    <FormDescription>{description}</FormDescription>
                  )}
                  <div className="flex">
                    <Group className={cn(dateInputStyle, "pe-9")}>
                      <DateInput slot="start" unstyled />
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground/70 px-2"
                      >
                        -
                      </span>
                      <DateInput slot="end" unstyled />
                    </Group>
                    <AriaButton className="text-muted-foreground/80 hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-ring/50 z-10 -ms-9 -me-px flex w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none data-focus-visible:ring-[3px]">
                      <CalendarIcon size={16} />
                    </AriaButton>
                  </div>
                  <AriaPopover
                    className="bg-background text-popover-foreground data-entering:animate-in data-exiting:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-md border shadow-lg outline-hidden"
                    offset={4}
                  >
                    <Dialog className="max-h-[inherit] overflow-auto p-2">
                      <RangeCalendar />
                    </Dialog>
                  </AriaPopover>
                </DateRangePicker>
              )}
            </InputWrapper>
          )}
          {type !== "date-range" && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
