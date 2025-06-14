import { toast } from "@/components/toast";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { useLocalStorageValue, useMountEffect } from "@react-hookz/web";

export const useFeedback = () => {
  const { value: feedbackAck, set: setFeedbackAck } =
    useLocalStorageValue<boolean>("feedback-ack");

  useMountEffect(() => {
    if (feedbackAck) return;
    setTimeout(() => {
      toast({
        id: "feedback",
        title: "Leave feedback for this prototype!",
        icon: (
          <SiDiscord className="size-8 dark:text-indigo-400 text-[#5865F2]" />
        ),
        description: "We'd love to hear your thoughts on Analog's Discord",
        button: {
          label: "Join",
          onClick: () => window.open("https://discord.gg/Dn4zzJqfJj", "_blank"),
        },
        variant: "discord",
        onDismiss: () => {
          setFeedbackAck(true);
        },
      });
    }, 2000);
  });
};
