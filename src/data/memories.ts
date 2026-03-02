export interface Memory {
    id: string;
    date: string;
    month: string;
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: "image" | "video";
    width?: number; // Aspect ratio hints for bento grid
    height?: number;
    className?: string; // Specific styling overrides for image framing/brightness
    textPositionClass?: string; // Tailwind alignment classes for the text bubble
}

export const memories: Memory[] = [
    {
        id: "1",
        date: "August 21, 2025",
        month: "August",
        title: "August: BGR",
        description: "This picture is from one of the first times we met! This was us coming back from the girls soccer game. I remember thinking you were really cute, but I was scared and not rly ready to make a move. The others said it was kinda obvious I liked u after we were playing Paranoia cuz I kept looking at u lol; we spent a bunch of time together and then started hanging out alone and I started to really like u! When we went stargazing and u gave me a kiss on the cheek u wouldn't believe how happy I was",
        mediaUrl: "/timeline_pics/pic1.jpeg",
        mediaType: "image",
        width: 2,
        height: 1,
        className: "object-[center_90%] brightness-[1.2]",
        textPositionClass: "justify-center items-end pb-12",
    },
    {
        id: "2",
        date: "September 19, 2025",
        month: "September",
        title: "September: First Month Together",
        description: "Three weeks in! We'd gotten so close already, and finally got adjusted to school. Had our first sleepover, as well as our first two parties! A couple ups and downs, but they all ultimately ended with us getting so much closer. We also planned our halloweed costumes! I remember we were gonna do Judy Hopps and Nick Wilde, but switched last min to HTTYD. I think it turned out great! My favorite part about this month was definitely getting closer to and cuddling with u. In this picture I think u fell asleep and i thoguht u were adorable so I took a pic hehe...",
        mediaUrl: "/timeline_pics/pic2.jpg",
        mediaType: "image",
        width: 1,
        height: 1,
        className: "object-[center_37.5%]",
        textPositionClass: "justify-end items-start pt-12 pr-12",
    },
    {
        id: "3",
        date: "October 31, 2025",
        month: "October",
        title: "October: Halloween",
        description: "Two months in! We went on so many dates in October and had so much yummy food. You planned out my birthday surprise so well and got me by far my favorite outfit! I also kinda messed up and broke a promise but it wont happen again. Halloween was so fun!! We were so active the whole time, and even though I was sick I had such a good time being around u. My favorite part of this month was definitely seeing you dressed up all pretty and ready to go out! Though getting ur old pics from Tanishka was probably a close second hehe. In this picture we were at the CST party Halloween night, dressed up in our HTTYD costumes! Although it got way too hot and we ended up taking it off rly quickly lol",
        mediaUrl: "/timeline_pics/pic3.jpg",
        mediaType: "image",
        width: 1,
        height: 2,
        className: "object-[center_65%]",
        textPositionClass: "justify-end items-end pb-12 pr-12",
    },
    {
        id: "4",
        date: "November 9, 2025",
        month: "November",
        title: "November: First Snow",
        description: "Three months in, and we finally got our first snow day! It was way colder than I expected (probably cuz of the wind) but the walk to chick fil a was so beautiful! This month was so eventful. We had so many firsts, from from a spa day, to snow, to aurora (which we def saw), to your judy hopps toy from mcdonalds! My favorite part of this month was definitely building the lego flowers together and watching blue box! I think you also took me to malatang for the first time this month and it was lifechanging. I missed u a lot over thanksgiving break, but I guess distance makes the love stronger! 'It takes two to tango....'",
        mediaUrl: "/timeline_pics/pic4.jpg",
        mediaType: "image",
        width: 2,
        height: 2,
        textPositionClass: "justify-start items-end pb-12 pl-12",
    },
    {
        id: "5",
        date: "December 19, 2025",
        month: "December",
        title: "December: Chicago",
        description: "Four months in! Our first Christmas and trip together! We got to see so many pretty Christmas decorations at Purdue, and ik my baby really liked the tree in the apt above Canes, so we'll try to get one of those next year! Other than that, we went on our first pottery date, as well as a lotta food dates! I was kinda busy this month cuz of FSAE so we weren't able to spend as much time together... but we made up for it in Chicago! My favorite part of this month was definitely sightseeing with you in Chicago, and trying all sorts of foods along the way! The late night daves was quite nice as well. I was truly sososo happy to see you so energetic and excited during the last night at Chicago, when you thought you could outwrestle me. Unfortunately you were nowhere close but it was a good effort! Hanging out in the Bay was also super nice cuz we finally had a car and could go wherever we wanted. This month was my favorite of the months we've spent together, but I'm sure we have much more in store!",
        mediaUrl: "/timeline_pics/pic5.jpg",
        mediaType: "image",
        width: 2,
        height: 1,
        textPositionClass: "justify-start items-start pt-12 pl-12",
    },
    {
        id: "6",
        date: "January 8, 2026",
        month: "January",
        title: "January: New Year",
        description: "Five months in! Although I didn't get to spend new years with you, I'm so glad I got to have you for the following day! I missed froyo so much and I'm so glad we decided to go grab some! My favorite part of this month was definitely our movie + bowling date, even though it felt like it passed so quickly. In-n-out afterward tasted so good! Although I'm not sure if you can say the same... I'll take you to Capt' Louie's Seafood Broil next time! And to see Evan's cats. I loved our daily calls over break, and although we did have a little dispute, I'm really grateful you came and told me everything you were feeling, so that we were able to talk it out. I love you soso much honey, and this will be only the first of many many new years we spend together!",
        mediaUrl: "/timeline_pics/pic6.jpg",
        mediaType: "image",
        width: 1,
        height: 1,
    },
    {
        id: "7",
        date: "February 14, 2026",
        month: "February",
        title: "February: Valentines Day",
        description: "Finally 6 months in! Once again, so many firsts! First valentines day, first ice skating date, and first cat cafe visit. This month was so exciting! We had our first double date with Caleb and Khannie, featuring a sad show and Pocha beforehand. My favorite part was definitely Valentines day; I've never seen you as excited as u were in that cat cafe, and you looked so stunning at both dinners, the night before and the night of. Pokemon GO was also definitely a highlight, and I loved walking around with you and catching all sorts of shinies! My baby got so lucky on our anniversary. Honestly, this first half a year has gone by so fast; I guess it's really true that time flies when you're having fun. If this was already half a year then a lifetime definitely won't be enough time to spend with you! But I guess we'll just have to make the most of it. I love you so much baby! Happy 6 Month!!",
        mediaUrl: "/timeline_pics/pic7.jpeg",
        mediaType: "image",
        width: 2,
        height: 2,
        textPositionClass: "justify-end items-center",
    }
];
