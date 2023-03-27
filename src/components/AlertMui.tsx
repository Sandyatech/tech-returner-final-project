import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface AlertMuiProps {
    openAlert: boolean | undefined;
    setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
    // setOpenAlert: () => {};
    // setOpenAlert: Dispatch<SetStateAction<boolean>>;
}

const AlertMui: React.FC<AlertMuiProps> = ({ openAlert, setOpenAlert }) => {
    // const [open, setOpen] = React.useState(false);

    // const handleClick = () => {
    //     // setOpen(true);
    //     setOpenAlert(true);
    // };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlert(false);
        // setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleClose}
            message="ERROR!!!! ERROR!!!! ERROR!!!! "
            action={action}
        />
    );
};

export default AlertMui;

// export default function AlertMui() {
//     const [open, setOpen] = React.useState(false);

//     const handleClick = () => {
//         setOpen(true);
//     };

//     const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
//         if (reason === "clickaway") {
//             return;
//         }

//         setOpen(false);
//     };

//     const action = (
//         <React.Fragment>
//             <Button color="secondary" size="small" onClick={handleClose}>
//                 UNDO
//             </Button>
//             <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
//                 <CloseIcon fontSize="small" />
//             </IconButton>
//         </React.Fragment>
//     );

//     return (
//         <div>
//             <Button onClick={handleClick}>Open simple snackbar</Button>
//             <Snackbar
//                 open={open}
//                 autoHideDuration={6000}
//                 onClose={handleClose}
//                 message="Note archived"
//                 action={action}
//             />
//         </div>
//     );
// }
