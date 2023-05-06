import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { Card } from "~/components/ui/card";

const GithubRepos: FC = () => {


    interface Repo {
        title: string;
        lang: string;
        color: string;
        link: string;
    }

    interface RepoModel {
        title: string;
        lang: string;
        color: string;
        link: string;
    }

    interface UserData {
        login: string;
    }

    const { data: session } = useSession();
    const [repos, setRepos] = useState<Repo[]>([]);

    async function getUserRepos(
        imageString: string
    ): Promise<void> {
        const userNumberId = imageString.substring(
            imageString.indexOf("/u/") + 3,
            imageString.indexOf("?v")
        );
        await getUserReposExtra(userNumberId);
    }

    async function getUserReposExtra(userNumberId: string): Promise<void> {
        const link = `https://api.github.com/user/${userNumberId}`;
        const response = await fetch(link, { method: "GET" });

        if (response.ok) {
            const data = (await response.json()) as UserData;
            const newLink = `https://github.com/${data.login}`;
            const response2 = await fetch(newLink, { method: "GET", mode: 'cors' });
            if (response2.ok) {
                const body = await response2.text();
                const parser = new DOMParser();
                const parsedDocument = parser.parseFromString(body, "text/html");
                const search = parsedDocument.getElementsByClassName('d-flex flex-wrap list-style-none gutter-condensed mb-4')[0];
                const repos2 = Array.from(
                    search?.getElementsByClassName("pinned-item-list-item-content") || []
                );
                const repos3: Repo[] = [];

                repos2.forEach((item: Element) => {
                    let link = '';
                    if (item.getElementsByClassName('d-flex width-full flex-items-center position-relative') != undefined) {
                        link = (item.getElementsByClassName('d-flex width-full flex-items-center position-relative')[0].children[0] as HTMLAnchorElement).href;
                        link = `https://github.com/\${link.substring(link.indexOf(data.login), link.length)}`;
                    }
                    const color: string = (item.getElementsByClassName('repo-language-color')[0] as HTMLElement).style.backgroundColor;
                    const title: string = (item.getElementsByClassName('repo')[0] as HTMLElement).title ?? '';
                    let lang = '';
                    if (item.getElementsByClassName('d-inline-block mr-3') != undefined) { lang = (item.getElementsByClassName('d-inline-block mr-3')[0].children[1] as HTMLElement).textContent ?? ''; }

                    repos3.push({
                        title: title,
                        lang: lang,
                        color: color,
                        link: link
                    });
                });

                setRepos(repos3);
            }
        }
    }


    useEffect(() => {
        if (session) {
            getUserRepos(session.user.image || "").catch((err) => {
                console.log(err);
            });
        }
    }, [session]);

    return (
        <div>
            {repos.map((item) => {
                return <a href={item.link} target="_blank" key={item.title}>
                    <Card className="w-[600px] m-2">
                        <p className='text-lg p-2 font-extrabold' style={{ color: item.color }}>
                            {item.title}</p>
                        <p className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-lg font-bold text-transparent p-2">
                            {item.lang}
                        </p>
                    </Card>
                </a>
            })}
        </div>
    );
}

export default GithubRepos;