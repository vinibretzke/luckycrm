import React from "react";
import MetisMenu from "react-metismenu";
import * as S from './styles';

export default function Sidebar(){
    const content=[
        {
            icon: 'icon-class-name',
            label: 'Label of Item',
            to: '#a-link',
        },
        {
            icon: 'icon-class-name',
            label: 'Second Item',
            content: [
                {
                    icon: 'icon-class-name',
                    label: 'Sub Menu of Second Item',
                    to: '#another-link',
                },
            ],
        },
    ];
    return (
        <S.Container>
            <MetisMenu content={content} />
        </S.Container>
    )
}