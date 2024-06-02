#!/usr/bin/env python3

import emoji
import random

# List of emojis
emoji_list = [
    '😀', '😂', '😍', '😎', '😘', '🤔', '😴', '💤', '😈', '👿',
    '👹', '👻', '🎃', '🎃', '👽', '🤖', '🦹', '🦸', '🦹‍♂️', '🦸‍♂️',
    '🦹‍♀️', '🦸‍♀️', '👻', '👽', '👺', '👿', '👹', '👽', '👾', '🤖',
    '💻', '🖥️', '📱', '📲', '💾', '💽', '📀', '📼', '🔁', '🔂',
    '▶️', '⏩', '⏭', '⏸', '⏯', '⏹', '⏏', '🔃', '🔄', '🔙',
    '🔚', '🔜', '🔝', '🔞', '🔓', '🔒', '🔑', '🔏', '🔒', '🔓'
]

# Select a random emoji from the list
selected_emoji = random.choice(emoji_list)

# Present the list of emojis to the user
for i, emoji in enumerate(emoji_list):
    print(f'{i+1}. {emoji}')

# Ask the user to choose an emoji
while True:
    try:
        user_choice = int(input('\nEnter the number of your choice: '))
        if 1 <= user_choice <= len(emoji_list):
            break
        else:
            print('Invalid choice. Please enter a number between 1 and {}.'.format(len(emoji_list)))
    except ValueError:
        print('Invalid input. Please enter a number between 1 and {}.'.format(len(emoji_list)))

# Display the selected emoji
if user_choice == 1:
    print('\nYou selected: {}'.format(selected_emoji))
else:
    print('\nYou selected: {}'.format(emoji_list[user_choice-1]))