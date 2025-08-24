import { Avatar, AvatarFallback, AvatarImage } from "../../shadcn/ui/avatar";
import { Button } from "../../shadcn/ui/button";
import { BellIcon, GithubIcon, SettingsIcon, UserIcon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../shadcn/ui/dropdown-menu";

export const TopNavigation = () => {
  return (
    <nav className="w-full bg-white border-b flex items-center">
      <div className="w-full max-w-3xl mx-auto flex justify-end items-center gap-2 p-2">
        <Button variant="link" className="mr-4" asChild>
          <a
            href="https://github.com/LucasNav6/gather-clone"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
            Contribuir
          </a>
        </Button>

        <Button variant="ghost" size="icon" aria-label="Notificaciones">
          <BellIcon className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" aria-label="Configuraciones">
          <SettingsIcon className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full p-0">
              <Avatar className="h-9 w-9 shadow-xs">
                <AvatarImage src="" alt="Usuario" />
                <AvatarFallback>
                  <UserIcon className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mi perfil</DropdownMenuItem>
            <DropdownMenuItem>Ajustes de notificaciones</DropdownMenuItem>
            <DropdownMenuItem>Ajustes generales</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOutIcon className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
