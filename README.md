## Obsidian Vim Utility Plugin

A simple plugin to mame it easier to use [Obsidian.md](https://obsidian.md/) together with Vim. I made it because I wanted to use Obsidian together with vim, [taskwarrior](https://taskwarrior.org/) and [taskwiki](https://github.com/tools-life/taskwiki).

It adds two commands to Obsidian.

1. Open current note with [MacVim](https://macvim-dev.github.io/macvim/).
2. Process note with [nvim](https://neovim.io/).

It currently only works on mac. The first command requires MacVim and the second requires nvim, but it would be easy to change it to similar solutions.

The second command opens the current note with nvim in the background, writes and closes it. In my own case I use this to sync the note with taskwarrior.

This solution is quite hacky and it is far from optimal. It does, however, make it easier for me to work with obsidian and taskwarrior, and I hope it can come to use for someone else too.

Based on the sample plugin for Obsidian.

### Manuall install

Copy main.js and manifest.json from this repository into .obsidian/plugins/obsidian-vim-utility in your Obsidian.md vault.
