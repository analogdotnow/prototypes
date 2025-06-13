import { Separator } from "@/components/ui/separator";
import { useMeasure, useUpdateEffect } from "@react-hookz/web";
import { type KeyboardEvent, useCallback } from "react";
import { useAppForm } from "../hooks/form";
import { useAiInput } from "../hooks/use-ai-input";
import { useEvents } from "../hooks/use-events";
import { eventFormSchemaWithRepeats } from "../schemas/form";
import { defaultFormOptions } from "../shared/form-defaults";
import { ErrorsPopover } from "./errors-popover";
import {
  DateGroup,
  Participants,
  TimeGroup,
  ToggleGroup,
  VideoConferencingButton,
} from "./form";

const EventForm = () => {
  const { addEvent } = useEvents();
  const [measurements, ref] = useMeasure<HTMLDivElement>();

  const form = useAppForm({
    ...defaultFormOptions,
    onSubmit: ({ value }) => {
      const data = eventFormSchemaWithRepeats.parse(value);
      addEvent(data);
      form.reset();
    },
  });

  const {
    isLoading,
    data: aiData,
    enabled: aiEnabled,
  } = useAiInput(() => form.getFieldValue("title"));

  useUpdateEffect(() => {
    if (!aiData) return;
    const { startDate, endDate, ...rest } = aiData;
    form.reset(
      {
        account: form.state.values.account,
        selectedParticipants: form.state.values.selectedParticipants,
        startDate: startDate.toString(),
        endDate: endDate.toString(),
        ...rest,
      },
      { keepDefaultValues: true },
    );
  }, [aiData]);

  const preventDefaultEnter = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLTextAreaElement) return;
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }, []);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onKeyDown={preventDefaultEnter}
      className="w-full"
    >
      <form.AppField name="title">
        {(field) => (
          <field.TitleField
            cardSize={measurements}
            isLoading={isLoading}
            aiEnabled={aiEnabled}
          />
        )}
      </form.AppField>
      <div
        className="relative rounded-lg border shadow-md dark:shadow-accent/40 bg-primary-foreground border-border"
        ref={ref}
      >
        <div className="py-3">
          <TimeGroup form={form} />
          <div className="flex flex-col gap-y-2">
            <DateGroup form={form} />
            <ToggleGroup form={form} />
            <form.AppField name="description">
              {(field) => <field.DescriptionField maxLength={400} />}
            </form.AppField>
            <Separator className="bg-muted-foreground/10" />
            <Participants form={form} />
            <Separator className="bg-muted-foreground/10" />
            <form.AppField name="location">
              {(field) => <field.LocationField />}
            </form.AppField>
            <Separator className="bg-muted-foreground/10" />
            <VideoConferencingButton />
            <Separator className="bg-muted-foreground/10" />
            <form.AppField name="account">
              {(field) => <field.SelectedAccountField />}
            </form.AppField>
            <Separator className="bg-muted-foreground/10" />
            <form.AppForm>
              <form.SubmitButton className="w-[calc(100%-1.9rem)] dark:w-[calc(100%-2rem)] mx-auto" />
            </form.AppForm>
          </div>
          <form.Subscribe selector={(state) => state.errorMap}>
            {(errors) =>
              errors.onChange && (
                <ErrorsPopover
                  className="absolute -top-3 -translate-y-full right-3 z-30"
                  side="bottom"
                  sideOffset={5}
                  align="end"
                  alignOffset={-14}
                  errors={errors.onChange}
                />
              )
            }
          </form.Subscribe>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
