import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteVideoAlertProps = {
  title: string;
  onConfirm: () => void;
  isDeleting?: boolean;
};

const DeleteVideoAlert = ({
  title,
  onConfirm,
  isDeleting,
}: DeleteVideoAlertProps) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete this video?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete{" "}
          <span className="font-medium text-foreground">{title}</span> from our
          servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          variant="destructive"
          disabled={isDeleting}
          onClick={(e) => {
            e.preventDefault();
            onConfirm();
          }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteVideoAlert;
