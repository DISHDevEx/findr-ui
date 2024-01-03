import Box, { BoxProps } from "@material-ui/core/Box";
import { ReactComponent as LogoSvg } from "../assets/findr_red_blocky.svg";

type LogoProps = {
  colored?: boolean;
  size?: number;
} & BoxProps;

const Logo = ({ colored = false, size = 200, ...boxProps }: LogoProps) => {
  return (
    <Box {...boxProps}>
      <LogoSvg height={size} width={size} />
    </Box>
  );
};

export default Logo;
