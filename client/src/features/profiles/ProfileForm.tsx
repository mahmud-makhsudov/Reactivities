import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import {
  profileSchema,
  type ProfileSchema,
} from "../../lib/schemas/profileSchema";
import { useProfile } from "../../lib/hooks/useProfile";

type Props = {
  profile: Profile;
  onCancel: () => void;
  onSuccess: () => void;
};

export default function ProfileForm({ profile, onSuccess }: Props) {
  const { updateProfile } = useProfile(profile.id);
  const { control, reset, handleSubmit } = useForm<ProfileSchema>({
    mode: "onTouched",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: profile.displayName,
      bio: profile.bio ?? "",
    },
  });

  useEffect(() => {
    reset({ displayName: profile.displayName, bio: profile.bio ?? "" });
  }, [profile, reset]);

  const displayName = useWatch({ control, name: "displayName" });

  const onSubmit = (data: ProfileSchema) => {
    updateProfile.mutate(data, { onSuccess });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <TextInput label="Display name" control={control} name="displayName" />
      <TextInput label="Bio" control={control} name="bio" multiline rows={4} />
      <Box display="flex" justifyContent="end" gap={2}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          disabled={
            displayName === profile.displayName || updateProfile.isPending
          }
          loading={updateProfile.isPending}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
