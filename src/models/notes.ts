//Note Creation Interface
export interface Notes {
  text: string;
  detailDescriptionFlag: boolean;
  member: memberNotes;
  id: number;
}

export interface memberNotes {
  id: number;
}
