import React, {Fragment, useState} from "react";
import { pure } from "recompose";
import BaseModal from "../base-modal/BaseModal";
import FilterModal from "./filter-modal/FilterModal";
import Button from "../button/Button";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Filter = ({filterOptions, onFilter}) => {
    const [modalOpened, setModalOpened] = useState(false);

    const handleAccept = async (params) => {
        await onFilter(params);
        setModalOpened(false);
    }

    return (
        <Fragment>
            <Button className="Btn-orange Btn-standard text-dark-blue font-w600 font-size-nm" onClick={() => setModalOpened(true)}>
                <FontAwesomeIcon icon={faFilter} className="mr-1 font-size-xs"></FontAwesomeIcon>
                Filter
            </Button>
            <BaseModal
                fullWidth={true}
                openState={modalOpened}
                onOpen={() => {}}
                onClose={() => setModalOpened(false)}
            >
                <FilterModal
                    filterOptions={filterOptions}
                    onClose={() => setModalOpened(false)}
                    onAccept={handleAccept}
                />
            </BaseModal>
        </Fragment>
    )
}

export default pure(Filter)
