import { Button, ButtonProps } from "./button";
import Spinner from "./spinner";

type LoadingButtonProps = { isLoading?: boolean; isDisabled?: boolean; loadingText?: string } & ButtonProps;

function LoadingButton({
  isLoading = false,
  isDisabled = false,
  loadingText = "",
  children,
  ...rest
}: LoadingButtonProps) {
  const Loading = () => (
    <div className="flex items-center gap-2">
      <Spinner />
      <p className="text-[13px] empty:hidden">{loadingText}</p>
    </div>
  );
  return (
    <Button {...rest} disabled={isDisabled}>
      {isLoading ? <Loading /> : children}
    </Button>
  );
}

export default LoadingButton;
