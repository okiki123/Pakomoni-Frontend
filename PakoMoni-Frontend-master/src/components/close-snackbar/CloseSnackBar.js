import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'
import { useSnackbar } from 'notistack'
import React from 'react'
import { pure } from 'recompose'

function CloseSnackBar() {

    const { closeSnackbar } = useSnackbar()

    const useStyles = makeStyles(() => ({
        root: {
            fill: 'inherit'
        }
    }))

    const classes = useStyles()

    return (
        <IconButton
            onClick={() => closeSnackbar()}
        >
            <Close classes={{ root: classes.root }} />
        </IconButton >
    )
}

export default pure(CloseSnackBar)
