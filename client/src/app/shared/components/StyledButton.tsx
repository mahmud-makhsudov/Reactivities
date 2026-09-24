import { Button, styled, type ButtonProps } from "@mui/material";
import type { LinkProps } from "react-router"

type StyledButtonProps = ButtonProps & Partial<LinkProps>

const StyledButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
  "&.Mui-disabled": {
    backgroudColor: theme.palette.grey,
    color: theme.palette.text.disabled,
  },
}));

export default StyledButton;