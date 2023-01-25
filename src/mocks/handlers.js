import { rest } from "msw";

const baseURL = "https://dacapo-api.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        "pk": 14,
        "username": "Strings22",
        "email": "dacapofakemail2@dacapo.com",
        "first_name": "",
        "last_name": "",
        "profile_id": 14,
        "profile_avatar": "https://res.cloudinary.com/duoxmqsyq/image/upload/v1/media/images/dominik-scythe-XV9F-gfmThs-unsplash_knuvac"
        })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];