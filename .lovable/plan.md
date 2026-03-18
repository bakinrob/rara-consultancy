

# Fix Portfolio Card Text Readability

## Problem
The portfolio cards overlay text directly on top of the project screenshot images using absolute positioning. The text competes with the website content visible in the screenshots, making everything unreadable (as visible in your screenshots).

## Solution
Restructure the cards to separate image and text into distinct zones -- image on top, text in a clean white/light card body below. No more overlay.

### Changes to `src/components/PortfolioSection.tsx`
- Remove the absolute-positioned text overlay from on top of the image
- Place text content in a separate `div` below the image with proper padding and a clean background
- Keep the gradient overlay on the image but make it lighter (just for visual polish, not for text contrast)
- Category tag and title go in the card body with proper dark text colors
- Description and detail text below in slate-600 tones
- Keep the hover zoom on the image and the arrow icon

### Layout stays the same
- First card still spans 2 columns on md+
- 2-column grid on md, 3-column on xl
- Rounded corners, shadow, border all preserved

