<script setup>
import logo from "@/assets/logo.png"
import pf from "@/assets/pf.webp"
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'

</script>
<template>
    <nav class="bg-green-900 w-full h-20 shadow-md">
        <div class="container mx-auto px-2 sm:px-4 h-full flex items-center justify-between">

            <div class="flex items-center justify-center shrink-0">
                <img class="h-16 w-auto" v-bind:src="logo" alt="logo">
            </div>

            <NavigationMenu>
                <NavigationMenuList class="flex gap-6">
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/" class="text-base text-white px-4 py-2">
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/crud" class="text-base text-white px-4 py-2">
                            Crud Task
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
     
        <div class="flex items-center gap-4">
            <Button variant="outline" class="text-green-800 hover:bg-green-800 hover:text-white">
                Outline
            </Button>
            <div class="w-10 h-10 bg-slate-700 rounded-full object-cover">
                <img v-bind:src="pf" alt="" class="rounded-full">
            </div>
        </div>
        </div>
    </nav>
</template>