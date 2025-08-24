import { Inngest } from "inngest";
import { connectDB } from "./connectDB.js";
import { User } from "../models/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "slack-clone" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, image_url } = event.data;
    // now we will create a new user in our database
    const newUser = {
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""}`,
      image: image_url,
      clerkId: id,
    };

    await User.create(newUser);

    await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.image
    })
  }
);

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk/user.deleted"},
    async ({event}) =>{
        const {id} = event.data;
        await connectDB();
        await User.deleteOne({clerkId:id});

        await deleteStreamUser(id.toString());
    }

)

export const functions = [syncUser, deleteUserFromDB];
