"""End-to-end run of the command line against a temporary store."""
from openpyxl import load_workbook

from voc import cli
from voc.store import RawStore

from conftest import FIXTURE_LONG, ROOT

INSIGHT = "Food uncertainty turns a holiday into a logistics problem."


def _point_cli_at(tmp_path, monkeypatch):
    monkeypatch.setattr(cli, "RAW_DIR", tmp_path / "raw")
    monkeypatch.setattr(cli, "CURATED_DIR", tmp_path / "curated")
    monkeypatch.setattr(cli, "ALIASES", tmp_path / "curated" / "aliases.json")
    monkeypatch.setattr(cli, "OUTPUT_DIR", tmp_path / "output")
    (tmp_path / "curated").mkdir()


def test_review_select_verify_build(tmp_path, monkeypatch, capsys, records):
    _point_cli_at(tmp_path, monkeypatch)
    RawStore(tmp_path / "raw").add(records.values())

    assert cli.main(["review", "--size", "10"]) == 0
    listing = capsys.readouterr().out
    assert "3 candidates not yet selected" in listing
    aliases = cli.load_aliases(tmp_path / "curated" / "aliases.json")
    alias_of = {rid: alias for alias, rid in aliases.items()}
    youtube_alias = alias_of["yt:UgxFIXTURE0000000000001"]
    assert f"[{youtube_alias}] YouTube | 2026-08-14" in listing

    (tmp_path / "curated" / "batch01.sel").write_text(
        f"*{youtube_alias}|S02|T02|{INSIGHT}\naz:R1FIXTURE0001|S12|T10|{INSIGHT}\n", encoding="utf-8"
    )
    assert cli.main(["verify"]) == 0
    assert "errors: 0" in capsys.readouterr().out

    assert cli.main(["review"]) == 0
    assert "1 candidates not yet selected" in capsys.readouterr().out

    assert cli.main(["build"]) == 0
    sheet = load_workbook(tmp_path / "output" / f"{cli.SHEET_NAME}.xlsx")["VoC Quotes"]
    quotes = [row[3] for row in sheet.iter_rows(min_row=2, values_only=True)]
    assert FIXTURE_LONG in quotes and len(quotes) == 2
    assert (tmp_path / "output" / f"{cli.SHEET_NAME}.csv").exists()

    assert cli.main(["stats"]) == 0
    assert "selected for the sheet: 2" in capsys.readouterr().out


def test_build_refuses_when_verification_fails(tmp_path, monkeypatch, capsys, records):
    _point_cli_at(tmp_path, monkeypatch)
    RawStore(tmp_path / "raw").add(records.values())
    (tmp_path / "curated" / "batch01.sel").write_text(f"yt:not-collected|S02|T02|{INSIGHT}\n", encoding="utf-8")
    assert cli.main(["build"]) == 1
    assert not (tmp_path / "output").exists()
    assert "not in the raw store" in capsys.readouterr().out


def test_no_test_fixture_ever_reaches_the_real_store():
    """Fixtures are invented text. The real raw store and the output must never contain one."""
    for folder in ("data", "output"):
        for path in (ROOT / folder).rglob("*"):
            if path.is_file() and path.suffix in {".jsonl", ".csv", ".sel", ".json"}:
                assert "TEST FIXTURE" not in path.read_text(encoding="utf-8", errors="ignore"), path
