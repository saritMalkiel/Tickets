import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateTicket } from "../hook/tickets";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const urgencies = ["low", "medium", "high"] as const;

const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    urgency: yup.string().oneOf(urgencies).required("Urgency is required"),
});

type FormData = yup.InferType<typeof schema>;
type AddUpdateProps = {
    onCreated?: () => void;
    onClose?: () => void;
};

export default function AddUpdate({ onCreated ,onClose}: AddUpdateProps) {
    const timer = useRef<number | undefined>(undefined);
    
    const { mutate: createTicket, isError, isSuccess, reset: resetMutation } = useCreateTicket();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            urgency: "low",
        }
    });

    useEffect(() => {
      
        return () => {
            clearTimeout(timer.current)
        }
    }, [])


    const onSubmit: SubmitHandler<FormData> = (data) => {
        createTicket(data, {
            onSuccess: () => {
                reset()
                timer.current = setTimeout(() => {
                    resetMutation();
                    onCreated?.();
                }, 1500);
            },
            onError: () => {
                timer.current = setTimeout(() => {
                    resetMutation();
                }, 3500);
            }

        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                Add New Ticket
                <IconButton aria-label="close" onClick={onClose} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    {isError && <Alert severity="error">Failed to create the ticket. Please try again.</Alert>}
                    {isSuccess && <Alert severity="success">Ticket created successfully.</Alert>}

                    <TextField
                        label="Title"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        multiline
                        minRows={3}
                        fullWidth
                    />

                    <TextField
                        select
                        label="Urgency"
                        defaultValue="low"
                        {...register("urgency")}
                        error={!!errors.urgency}
                        helperText={errors.urgency?.message}
                        fullWidth
                    >
                        {urgencies.map(urgency => (
                            <MenuItem key={urgency} value={urgency}>
                                {urgency}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button type="submit" variant="contained">
                    Add Ticket
                </Button>
            </DialogActions>
        </Box>
    );
}
