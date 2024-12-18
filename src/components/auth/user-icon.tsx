





import React from 'react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Button } from "../../components/ui/button"

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { useCurrentUser } from '../../helpers/zustand';
import { removeSessionUser } from "./../../helpers/session-user/remove-session-user"
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import getSessionUser from '../../helpers/session-user/get-session-user';

const InitialsCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #333;
`;

const InitialsText = styled.span`
  font-size: 14px;
`;

const ButtonWrapper = styled.button`
  position: relative;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
`;

const UsernameImage = ({ username }: { username: string }) => {
    const initials = username.split(' ').map(word => word[0].toUpperCase()).join('');

    return (
        <ButtonWrapper>
            <InitialsCircle>
                <InitialsText>{initials}</InitialsText>
            </InitialsCircle>
        </ButtonWrapper>
    );
};

export const UserIcon = () => {
    const { removeCurrentUser } = useCurrentUser()
    const currentUser = getSessionUser()
    const capitalizedUsername = currentUser?.username?.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const navigate = useNavigate()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='none outline-none'>
                <button className='border-2  rounded-full'>
                    {currentUser?.username ? (
                        <UsernameImage username={currentUser?.username} />
                    ) : (
                        <span>No username</span>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=''>
                <DropdownMenuLabel>{capitalizedUsername}</DropdownMenuLabel>
                <DropdownMenuItem
                    className='mx-2 text-white font-medium bg-red-500 hover:bg-red-500 focus:bg-red-500'
                    onClick={() => {
                        navigate("/signin")
                        removeSessionUser()
                        removeCurrentUser()
                        return
                    }}
                >
                    Log Out
                </DropdownMenuItem>
                <DropdownMenuSeparator />

            </DropdownMenuContent>
        </DropdownMenu>
    )
}