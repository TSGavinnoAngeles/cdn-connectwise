import { Context } from "hono";
import { Document, uploadScreenshot } from "../models/document";

export const uploadDocument = async (c: Context) => {
  const { file, id, title } = (await c.req.json()) as uploadScreenshot;

  const auth = c.req.header("Authorization");
  const clientId = c.req.header("clientId");

  if (!auth || !clientId) {
    return c.text("Authorization Needed", { status: 400 });
  }

  if (!file) {
    return c.text("File Needed", { status: 400 });
  }

  if (!id) {
    return c.text("Record ID Needed", { status: 400 });
  }
  if (!title) {
    return c.text("Image Name Needed", { status: 400 });
  }

  let base64result = file.split(",")[1];
  const image = new File(
    [Uint8Array.from(atob(base64result), (c) => c.charCodeAt(0))],
    `${title}.png`,
    { type: "image/png" }
  );

  const formData = new FormData();
  formData.append("file", image),
    formData.append("title", ` ${title} For Ticket ${id}`),
    formData.append("recordId", id.toString()),
    formData.append("recordType", "Ticket");

  try {
    const res = await fetch(
      `https://sandbox-na.myconnectwise.net/v4_6_release/apis/3.0/system/documents`,
      {
        method: "POST",
        headers: {
          Authorization: auth,
          clientId: clientId,
        },
        body: formData,
      }
    );

    const json = (await res.json()) as Document;

    if (res.ok) {
      return c.json(json);
    }

    if (!res.ok) {
      return c.text(`${JSON.stringify(json)}`, {
        status: 400,
      });
    }
  } catch (error) {
    return c.text(`Error: ${error}`, { status: 500 });
  }
};
