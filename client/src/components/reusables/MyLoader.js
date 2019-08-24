import React from 'react'
import { css } from '@emotion/core';
import MoonLoader from 'react-spinners/MoonLoader'

 const MyLoader = (props) => {
    const override = css`
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
        border-color: red;
    `;
    return (
        <div>
            <MoonLoader
            css={override}
            sizeUnit={"px"}
            size={100}
            color={'#123abc'}
            loading={props.loading}
            />
        </div>
    )
}

export default MyLoader