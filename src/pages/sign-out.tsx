import React from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Button } from "../components/ui/button"

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { useCurrentUser } from '../helpers/zustand';
import { removeSessionUser } from "./../helpers/session-user/remove-session-user"
// import { TodosListTable } from "./../components/todos/todoslist-table"
export default function SignOut() {
  return (
    <div>signout
      {/* <TodosListTable /> */}
    </div>
  )
}
function handlelogout() {
  return removeSessionUser()

}
