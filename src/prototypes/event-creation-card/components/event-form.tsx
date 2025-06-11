import { Separator } from "@/components/ui/separator";
import { useAppForm } from "../hooks/form";
import { useEvents } from "../hooks/use-events";
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

  const form = useAppForm({
    ...defaultFormOptions,
    onSubmit: async ({ value }) => {
      addEvent(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="w-full"
    >
      <form.AppField name="title">
        {(field) => <field.TitleField />}
      </form.AppField>
      <div className="relative rounded-lg border shadow-md dark:shadow-accent/40 bg-primary-foreground border-border py-3">
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
                className="absolute -top-3 -translate-y-full right-2.5 z-30"
                side="bottom"
                sideOffset={5}
                align="end"
                alignOffset={-12}
                errors={errors.onChange}
              />
            )
          }
        </form.Subscribe>
      </div>
    </form>
  );
};

export default EventForm;
